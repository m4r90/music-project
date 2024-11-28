import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

def load_data():
    vectorized_data = pd.read_csv('vectorized_data.csv')
    preprocessed_data = pd.read_csv('preprocessed_data_riged.csv')

    vectorized_data['encoded_tag'] = preprocessed_data['encoded_tag']

    print(vectorized_data.head())
    return vectorized_data

def split_data(data):
    X = data.drop(columns=['encoded_tag'])
    y = data['encoded_tag']
    return X, y

# Entraîner les modèles et évaluer
def train_and_evaluate(X_train, X_test, y_train, y_test):
    # Logistic Regression
    model_lr = LogisticRegression(max_iter=1000)
    model_lr.fit(X_train, y_train)
    y_pred_lr = model_lr.predict(X_test)
    print("Logistic Regression Accuracy:", accuracy_score(y_test, y_pred_lr))
    print(classification_report(y_test, y_pred_lr))

    # Random Forest
    model_rf = RandomForestClassifier(n_estimators=100, random_state=42)
    model_rf.fit(X_train, y_train)
    y_pred_rf = model_rf.predict(X_test)
    print("Random Forest Accuracy:", accuracy_score(y_test, y_pred_rf))
    print(classification_report(y_test, y_pred_rf))

    return model_rf

# Sauvegarder le modèle et le vectorizer
def save_model(model, vectorizer):
    joblib.dump(model, 'music_genre_model.pkl')  # Sauvegarder le modèle
    joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')  # Sauvegarder le vectorizer
    print("Modèle et vectorizer sauvegardés.")

if __name__ == "__main__":
    data = load_data()
    X, y = split_data(data)

    # Diviser les données en train et test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Entraîner et évaluer les modèles
    trained_model = train_and_evaluate(X_train, X_test, y_train, y_test)

    # Sauvegarder le modèle et le vectorizer
    # Ici, on suppose que le vectorizer a été utilisé dans le processus de vectorisation, donc il doit être sauvegardé
    vectorizer = joblib.load('tfidf_vectorizer.pkl')  # Si tu veux recharger un vectorizer sauvegardé (sinon, tu peux passer cette ligne)
    save_model(trained_model, vectorizer)
