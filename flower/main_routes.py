from flask import Blueprint, render_template, redirect, url_for, request, session, jsonify

from database.filter_category_queries import get_products_by_category, get_product, get_similar_products, get_products_by_info_below, get_similar_products_to_cart_and_wishlist
from database.reviews_queries import get_rewievs_all, add_new_review, get_latest_reviews
from database.feedback_queries import add_new_feedback
from database.manufacturers_queries import get_manufacturers
from database.basket_queries import get_approved_basket_items
from database.order_queries import add_order_to_db
from database.models import Product, Category, Manufacturer
from database.engine import session_factory as SessionFactory

from .image_upload import save_images

main_routes = Blueprint('main', __name__)


@main_routes.route('/', methods=['GET', 'POST'])
def main():
    if request.method == "POST":
        username = request.form.get('username')
        contact = request.form.get('contact')
        comment = request.form.get('comment')
        add_new_feedback(username, contact, comment)
        return redirect('/')
    all_reviews = get_latest_reviews()
    return render_template("index.html", all_reviews=all_reviews)


@main_routes.route('/garantee')
def garantee():
    return render_template("garantee.html")


@main_routes.route('/reviews', methods=["GET", "POST"])
def reviews():
    if request.method == "POST":
        username = request.form.get('username')
        comment = request.form.get('comment')
        rating = int(request.form.get('rating'))
        add_new_review(username, comment, rating)
        return redirect('/reviews')
    all_reviews = get_rewievs_all()
    return render_template("reviews.html", all_reviews=all_reviews)


@main_routes.route('/categories')
def categories():
    return render_template("categories.html")


@main_routes.route('/products/category/<category_slug>')
def category_products(category_slug):
    sort = request.args.get("sort", "")
    manufacturers = get_manufacturers()
    produtcs, category = get_products_by_category(category_slug, sort)
    title = f'{category} - MeloFlora'
    return render_template("products.html", title=title, category_slug=category_slug, products=produtcs, manufacturers=manufacturers, sort=sort)


@main_routes.route('/products/manufacturer/<m_name>')
def products_by_manufacturer(m_name: str):
    sort = request.args.get("sort", "")
    manufacturers = get_manufacturers()
    products, title = get_products_by_info_below(manufacturer_slug=m_name, sort=sort)
    return render_template("products.html", title=title, products=products, manufacturers=manufacturers, sort=sort)


@main_routes.route('/products/country/<c_name>')
def products_by_country(c_name: str):
    sort = request.args.get("sort", "")
    manufacturers = get_manufacturers()
    products, title = get_products_by_info_below(country_slug=c_name, sort=sort)
    return render_template("products.html", title=title, products=products, manufacturers=manufacturers, sort=sort)


@main_routes.route('/products/<int:product_id>')
def product_page(product_id):
    product, category_name, manufacturer = get_product(product_id)
    title = f'{product.name} - MeloFlora'
    similar_products = get_similar_products(product)
    return render_template("productpage.html", title=title, product=product, category_name=category_name, manufacturer=manufacturer, similar_products=similar_products)


@main_routes.route('/wishlist', methods=["GET", "POST"])
def likelist():
    similar_products = []

    if request.method == "POST":
        data = request.get_json()
        raw_ids = data.get("ids", [])
        ids = list(map(int, raw_ids))
        similar_products = get_similar_products_to_cart_and_wishlist(product_list=ids)
    else:
        similar_products = get_similar_products_to_cart_and_wishlist(product_list=[])

    return render_template("likelist.html", similar_products=similar_products)


@main_routes.route('/basket', methods=["GET", "POST"])
def basket():
    similar_products = []

    if request.method == "POST":
        data = request.get_json()
        raw_ids = data.get("ids", [])
        ids = list(map(int, raw_ids))
        similar_products = get_similar_products_to_cart_and_wishlist(product_list=ids)
    else:
        similar_products = get_similar_products_to_cart_and_wishlist(product_list=[])

    return render_template("basket.html", similar_products=similar_products)


@main_routes.route('/make_order', methods=['POST'])
def make_order():
    try:
        data = request.get_json()
        basket = data.get('basket', [])
        client_total = data.get('client_total', 0)

        if not basket:
            return jsonify({'status': 'error', 'message': 'Кошик порожній'})

        customer_data = data.get("customer", {})
        customer_name = customer_data.get("name", "Клієнт")
        customer_contact = customer_data.get("contact", "Без контакту")
        customer_mail = customer_data.get("email", "Без почти")
        delivery_address = customer_data.get("address", "Немає адреси")
        payment_method = customer_data.get("payment", "Невідомо")

        success, message, approved_basket_items = get_approved_basket_items(basket, client_total)
        if not success:
            return jsonify({'status': 'error', 'message': message})

        product_map = {int(item["id"]): item for item in basket}
        basket_dicts = []
        for product in approved_basket_items:
            item = product_map.get(product.id, {})
            basket_dicts.append({
                "name": product.name,
                "quantity": item.get("quantity", 1),
                "price": product.price
            })
        print(basket_dicts)

        save_success = add_order_to_db(
            customer_name,
            customer_contact,
            customer_mail,
            delivery_address,
            payment_method,
            client_total,
            basket_dicts
        )

        if not save_success:
            return jsonify({'status': 'redirect', 'location': '/order_reject'})

        return jsonify({'status': 'success'})
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': 'Помилка на сервері'}), 500
    

@main_routes.route('/order_success')
def order_success():
    return render_template('success.html')


@main_routes.route('/order_reject')
def order_reject():
    return render_template('reject.html')


@main_routes.route('/about-us')
def about_us():
    return render_template("about_us.html")


@main_routes.route('/cart')
def cart():
    return render_template("form-page.html")



@main_routes.route('/admin/products', methods=['GET', 'POST'])
def admin_products():
    with SessionFactory() as session:
        if request.method == 'POST' and request.form.get('action') == 'add':
            files = request.files.getlist('images')
            print(files)
            image_urls = save_images(files)
            image_url_str = ','.join(image_urls)

            new_product = Product(
                name=request.form['name'],
                price=float(request.form['price']),
                image_url=image_url_str,
                category_id=int(request.form['category']),
                manufacturer_id=int(request.form['manufacturer']),
                description=request.form.get('description', '')
            )
            session.add(new_product)
            session.commit()
            return redirect(url_for('main.admin_products'))

        products = session.query(Product).all()
        categories = session.query(Category).all()
        manufacturers = session.query(Manufacturer).all()

    return render_template(
        'admin_products.html',
        products=products,
        categories=categories,
        manufacturers=manufacturers
    )

@main_routes.route('/admin/products/edit/<int:product_id>', methods=['POST'])
def edit_product(product_id):
    with SessionFactory() as session:
        product = session.get(Product, product_id)
        product.name = request.form['name']
        product.price = float(request.form['price'])
        product.category_id = int(request.form['category'])
        product.manufacturer_id = int(request.form['manufacturer'])
        product.description = request.form.get('description', '')

        files = request.files.getlist('images')
        if files and any(f.filename for f in files):
            new_image_urls = save_images(files)
            existing = product.image_url.split(',') if product.image_url else []
            product.image_url = ','.join(existing + new_image_urls)

        session.commit()
    return redirect(url_for('main.admin_products'))

@main_routes.route('/admin/products/delete/<int:product_id>', methods=['POST'])
def delete_product(product_id):
    with SessionFactory() as session:
        product = session.get(Product, product_id)
        session.delete(product)
        session.commit()
    return redirect(url_for('main.admin_products'))