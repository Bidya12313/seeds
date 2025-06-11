from flask import Blueprint, render_template, flash, redirect, url_for, request

from database.filter_category_queries import get_products_by_category, get_product, get_similar_products, get_products_by_info_below


main_routes = Blueprint('main', __name__)


@main_routes.route('/')
def main():
    return render_template("index.html")


@main_routes.route('/contacts')
def contacts():
    return render_template("index.html")


@main_routes.route('/garantee')
def garantee():
    return render_template("garantee.html")


@main_routes.route('/reviews')
def reviews():
    return render_template("reviews.html")


@main_routes.route('/categories')
def categories():
    return render_template("categories.html")


@main_routes.route('/products')
def category_products():
    slug = request.args.get('category')
    if slug:
        produtcs, category_name = get_products_by_category(slug)
    return render_template("products.html", slug=slug, products=produtcs, category_name=category_name)


@main_routes.route('/products/manufacturer/<m_name>')
def products_by_manufacturer(m_name: str):
    products = get_products_by_info_below(manufacturer_slug=m_name)
    return render_template("products.html", products=products)


@main_routes.route('/products/country/<c_name>')
def products_by_country(c_name: str):
    products = get_products_by_info_below(country_slug=c_name)
    return render_template("products.html", products=products)


@main_routes.route('/products/<int:product_id>')
def product_page(product_id):
    product, category_name, manufacturer = get_product(product_id)
    similar_products = get_similar_products(product)
    return render_template("productpage.html", product=product, category_name=category_name, manufacturer=manufacturer, similar_products=similar_products)


@main_routes.route('/wishlist')
def likelist():
    return render_template("likelist.html")


@main_routes.route('/basket')
def basket():
    return render_template("basket.html")


@main_routes.route('/about-us')
def about_us():
    return render_template("about_us.html")


@main_routes.route('/cart')
def cart():
    return render_template("form-page.html")

