# ベースとなるDockerイメージ指定
FROM node:18.16.1-alpine

# アプリケーションディレクトリを作成
WORKDIR /usr/src/app

# 依存関係のあるファイルをコピー
COPY package*.json ./

# プロジェクトの依存関係をインストール
RUN npm install

# アプリケーションのソースをバンドル
COPY . .

# ポート3000でアプリケーションを実行
EXPOSE 3000

# コンテナを起動する際のコマンドを指定
CMD [ "npm", "start" ]
