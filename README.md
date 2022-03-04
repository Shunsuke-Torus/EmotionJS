# EmotionJS

## Intro
Azure Face apiを利用し感情のグラフを描画する

## API public/js/main.js
- L32にAzure/Face API/リソース管理/キーとエンドポイントのキー値を入れる
```
let subscriptionKey = "{hoge}";
```
- L33にAzure/Face API/リソース管理/キーとエンドポイントのエンドポイント値を入れる
```
let uriBase ="https://{hoge}.azure.com/face/v1.0/detect";
```

### Use
```
$ npm install
$ npm run dev
```
- http://localhost:8080/

### description
1. cameraを押すとWebカメラが起動される<p>
2. cameraを起動した状態でCaptureを押すと撮影される<p>
3. 撮影されると感情のグラフが表示される
