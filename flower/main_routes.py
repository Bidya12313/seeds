from flask import Blueprint, render_template, flash, redirect, url_for


main_routes = Blueprint('main', __name__)


@main_routes.route('/')
def main():
    return render_template("index.html")