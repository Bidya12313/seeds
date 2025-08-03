from flask import Blueprint, render_template, flash, redirect, url_for, request

from database.filter_category_queries import get_products_by_category, get_product, get_similar_products, get_products_by_info_below, get_similar_products_to_cart_and_wishlist
from database.reviews_queries import get_rewievs_all, add_new_review, get_latest_reviews
from database.feedback_queries import add_new_feedback
from database.manufacturers_queries import get_manufacturers
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


@main_routes.route('/contacts')
def contacts():
    return render_template("index.html")


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


@main_routes.route('/products')
def category_products():
    slug = request.args.get('category')
    manufacturers = get_manufacturers()
    if slug:
        produtcs, category_name = get_products_by_category(slug)
    return render_template("products.html", slug=slug, products=produtcs, category_name=category_name, manufacturers=manufacturers)


@main_routes.route('/products/manufacturer/<m_name>')
def products_by_manufacturer(m_name: str):
    manufacturers = get_manufacturers()
    products = get_products_by_info_below(manufacturer_slug=m_name)
    return render_template("products.html", products=products, manufacturers=manufacturers)


@main_routes.route('/products/country/<c_name>')
def products_by_country(c_name: str):
    manufacturers = get_manufacturers()
    products = get_products_by_info_below(country_slug=c_name)
    return render_template("products.html", products=products, manufacturers=manufacturers)


@main_routes.route('/products/<int:product_id>')
def product_page(product_id):
    product, category_name, manufacturer = get_product(product_id)
    similar_products = get_similar_products(product)
    return render_template("productpage.html", product=product, category_name=category_name, manufacturer=manufacturer, similar_products=similar_products)


@main_routes.route('/wishlist', methods=["GET", "POST"])
def likelist():
    if request.method == "POST":
        data = request.get_json()
        raw_ids = data.get("ids", [])
        ids = list(map(int, raw_ids))
        similar_products = get_similar_products_to_cart_and_wishlist(product_list=ids)
    similar_products = get_similar_products_to_cart_and_wishlist(product_list=[])
    return render_template("likelist.html", similar_products=similar_products)


@main_routes.route('/basket', methods=["GET", "POST"])
def basket():
    if request.method == "POST":
        data = request.get_json()
        raw_ids = data.get("ids", [])
        ids = list(map(int, raw_ids))
        print("Отримано айді:", ids) 
        similar_products = get_similar_products_to_cart_and_wishlist(product_list=ids)
    similar_products = get_similar_products_to_cart_and_wishlist(product_list=[])
    print("Повертаємо схожі товари з ID:", [p.id for p in similar_products])
    return render_template("basket.html", similar_products=similar_products)


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