from flask import Blueprint, render_template, flash, redirect, url_for


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


@main_routes.route('/wishlist')
def likelist():
    return render_template('likelist.html')


@main_routes.route('/basket')
def basket():
    return render_template('basket.html')