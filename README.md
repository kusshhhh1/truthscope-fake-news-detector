# 📰 TruthScope - AI-Powered Fake News Detection App

TruthScope is a smart web app that detects whether a news article or headline is **Real**, **Fake**, or **Uncertain** using a combination of Machine Learning and real-time source verification via NewsAPI.

---

## 🚀 Features
- Real-time verification via NewsAPI.org
- ML-based prediction using TF-IDF + Logistic Regression
- Confidence scores and explanation
- Switchable Light/Dark themes with modern UI

---

## 🛠 Tech Stack
Python · Streamlit · Scikit-learn · Pandas · NLTK · NewsAPI

---

## ⚙️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/truthscope-fake-news-detector.git
   cd truthscope-fake-news-detector
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Add your NewsAPI key:  
   Create a `.env` file and add:
   ```
   NEWSAPI_KEY=your_api_key_here
   ```
   > *Note: The original API key has been removed for security reasons.*

4. Run the app:
   ```bash
   streamlit run app.py
   ```

---

## 👨‍💻 Author
Made with ❤️ by Kushagra Sharma during the Pinnacle Data Science Internship  

