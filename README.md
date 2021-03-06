# CATOVIS Office

「翻訳にもっと機械の力を」
そのために開発しているWebアプリのページです。
NuxtからSapperへの移行実施中。

完全にCLIで使用する場合は[こちらのリポジトリ](https://github.com/CPkobo/catovis-office-cli)をご参照ください。

MITライセンスのため、改変等自由です。

## 使い方（Webブラウザ）

[CATOVIS](https://catovis.com/app) にアクセスして使用可能です。

### テキスト抽出

MS Officeのファイルからテキストの抽出が可能です。
対応しているフォーマットは docx/docm/xlsx/xlsm/pptx/pptm の6種類です。

抽出されたテキストは **@@_** で始まるファイル名と ファイルの終わりを示す **@@_EOF**、
段落／シート／スライドなどの区切り記号 **\_@λ\_ 〇〇〇 \_λ@\_**などを含みます。

これらの区切り記号はオプションで省略することも可能です。

また、翻訳者にとって必要な文字カウント機能もあります。

### 対訳表作成

### 類似度解析

レーベンシュタイン距離により、ファイル内・ファイル間で文と文の類似度を計算します。
また、類似度に基づいて文字数に重みづけをした計算も可能です。

### テキスト差分表示

### 正規表現プレイグラウンド

## 独自ビルド

```bash
git clone https://github.com/CPkobo/office.git
cd office
yarn install
```

これでリポジトリを使用する準備が整いました。

```bash
yarn dev # 開発用に一時的立ち上げ
yarn build # Node環境でビルド
yarn export # 静的サイトとしてビルド
yarn start # 開発サーバーの立ち上げ、ビルドしたものをホスト
```