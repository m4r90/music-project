import pandas as pd

def load_and_clean_data(file_path):
    df = pd.read_csv(file_path)

    df = df[df['language'] == 'en']

    df['cleaned_lyrics'] = df['lyrics'].apply(lambda x: clean_lyrics(x))
    return df

def clean_lyrics(lyrics):
    cleaned_lyrics = ''.join([char.lower() for char in lyrics if char.isalpha() or char.isspace()])
    return cleaned_lyrics

if __name__ == "__main__":
    file_path = 'preprocessed_data_riged.csv'
    df = load_and_clean_data(file_path)
    df.to_csv('preprocessed_data_riged.csv', index=False)
