from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return """
    <html>
        <body style="background:black;color:white;">
            <h1>FLASK IS WORKING 🎉</h1>
        </body>
    </html>
    """

if __name__ == "__main__":
    app.run(debug=True)