# encode_tags.py
import pandas as pd
from sklearn.preprocessing import LabelEncoder

def encode_tags(file_path):
    df = pd.read_csv(file_path)
    label_encoder = LabelEncoder()
    df['encoded_tags'] = label_encoder.fit_transform(df['tag'])
    return df, label_encoder

if __name__ == "__main__":
    df, label_encoder = encode_tags('preprocessed_data_riged.csv')
    df.to_csv('encoded_data.csv', index=False)
