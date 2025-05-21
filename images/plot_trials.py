import pandas as pd
import matplotlib.pyplot as plt
import os

folder_path = "/home/jamalsmallz/Documents/data"
csv_files = [f for f in os.listdir(folder_path) if f.startswith('trial') and f.endswith('.csv')]

for file in csv_files:
    print(f"Processing {file} ...")
    file_path = os.path.join(folder_path, file)
    df = pd.read_csv(file_path)

    if df.shape[1] < 2:
        continue

    df = df.dropna().iloc[::2].head(10)
    x = df.iloc[:, 0].astype(str)
    y = df.iloc[:, 1]

    try:
        plt.figure()
        plt.bar(x, y)
        plt.title(f'Bar Plot - {file}')
        plt.tight_layout()
        plt.savefig(os.path.join(folder_path, f'{file}_barplot.png'))
        plt.close()
    except Exception as e:
        print(f"Bar plot failed for {file}: {e}")

    try:
        plt.figure()
        plt.scatter(df.iloc[:, 0], df.iloc[:, 1])
        plt.title(f'Scatter Plot - {file}')
        plt.tight_layout()
        plt.savefig(os.path.join(folder_path, f'{file}_scatterplot.png'))
        plt.close()
    except Exception as e:
        print(f"Scatter plot failed for {file}: {e}")

    print(f"Done with {file}")
