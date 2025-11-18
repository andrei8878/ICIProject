from flask import Flask,render_template,redirect,request

app = Flask(__name__)

@app.route("/")
def homePage():
    return render_template("main.html")

@app.route("/game/<string:id>")
def gamePage(string:int):
    pass

if __name__ == "__main__":
    app.run(debug=True)