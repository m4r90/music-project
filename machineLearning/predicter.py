import joblib
import pandas as pd

def load_model():
    model = joblib.load('music_genre_model.pkl')
    vectorizer = joblib.load('tfidf_vectorizer.pkl')
    return model, vectorizer

def predict_genre(new_lyrics):
    model, vectorizer = load_model()

    X_new = vectorizer.transform(new_lyrics)

    predicted_tag = model.predict(X_new)
    print(f"Le genre musical prédit : {predicted_tag[0]}")

if __name__ == "__main__":
    new_lyrics = [
        "[Intro]\n"
        "Ooh-oh\n"
        "No, no, no, no\n"
        "No, no, no, no, no, no, no\n"
        "No-ouh\n"
        "\n"
        "[Verse 1]\n"
        "When you feel it in your body, you found somebody who\n"
        "Makes you change your ways like hanging with your crew\n"
        "Said you act like you ready, but you don't really know\n"
        "And everything in your past, you wanna let it go\n"
        "\n"
        "[Pre-Chorus 1]\n"
        "I've been there, done it, fucked around\n"
        "After all that, this is what I found\n"
        "Nobody wants to be alone\n"
        "If you're touched by the words in this song\n"
        "Then maybe...\n"
        "\n"
        "[Chorus]\n"
        "You got it, you got it bad\n"
        "When you're on the phone, hang up and you call right back\n"
        "You got it, you got it bad\n"
        "If you miss a day without your friend, your whole life's off-track\n"
        "Know you got it bad when you're stuck in the house\n"
        "You don't wanna have fun, it's all you think about\n"
        "You got it bad when you're out with someone\n"
        "But you keep on thinking 'bout somebody else\n"
        "You got it bad\n"
        "[Verse 2]\n"
        "When you say that you love them and you really know\n"
        "Everything that used to matter don't matter no more\n"
        "Like my money, all my cars (you can have it all and)\n"
        "Flowers, cards and candy (I do it just 'cause I'm)\n"
        "Said I'm fortunate to have you, girl\n"
        "I want you to know I really adore you\n"
        "All my people who know what's going on\n"
        "Look at your mate, help me sing my song\n"
        "Tell her: \"I'm your man, you're my girl\n"
        "I'm gonna tell it to the whole wide world\"\n"
        "Ladies say: \"I'm your girl, you're my man\n"
        "Promise to love you the best I can\"\n"
        "\n"
        "[Pre-Chorus 2]\n"
        "See, I've been there, done it, fucked around\n"
        "After all that, this is what I found\n"
        "Everyone of y'all are just like me\n"
        "It's too bad that you can't see\n"
        "That you got it bad\n"
        "\n"
        "[Chorus]\n"
        "You got it, you got it bad\n"
        "When you're on the phone, hang up and you call right back\n"
        "You got it, you got it bad\n"
        "If you miss a day without your friend, your whole life's off track\n"
        "Know you got it bad when you're stuck in the house\n"
        "You don't wanna have fun, it's all you think about\n"
        "You got it bad when you're out with someone\n"
        "But you keep on thinking 'bout somebody else\n"
        "You got it bad\n"
        "[Electric Guitar Solo]\n"
        "\n"
        "[Chorus]\n"
        "You got it, you got it bad\n"
        "When you're on the phone, hang up and you call right back\n"
        "You got it, you got it bad\n"
        "If you miss a day without your friend, your whole life's off track\n"
        "Know you got it bad when you're stuck in the house\n"
        "You don't wanna have fun, it's all you think about\n"
        "You got it bad when you're out with someone\n"
        "But you keep on thinking 'bout somebody else..."
    ]

    # Tu peux maintenant utiliser new_lyrics pour les traiter ou les tester
    print(new_lyrics[0])  # Par exemple, affiche la première ligne



    predict_genre(new_lyrics)
