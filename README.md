# tile-dist-from-pmtiles
PMTiles からタイルの統計データ（データの分布）を取得する

* `getStat.js` が主となるツールです。PMTiles の directory を読み出して、csv （`stat.csv`）として出力します。
* `matching.js` は、`stat.csv` を [mokuroku](https://github.com/gsi-cyberjapan/mokuroku-spec) の csv データと結合して一つのデータとするためのものです。
* `list2poly.js` 及び `tiler.js` は、`stat.csv` を地図表示用のベクトルタイルへ変換します。

blog：[PMTiles からタイル一覧とサイズを取得する（国土地理院最適化ベクトルタイルを例に）](https://qiita.com/mg_kudo/items/9f87fca0c579fd2b645d)

## R での解析例
```
df <- read.csv("stat.csv")
head(df)

par(mfrow=c(3,5))

for( i in 4:16 ){
  df2 <- subset(df, z==i)
  df2$length <- df2$length / (1024)
  maxsize = max(df2$length)
  hist(df2$length, breaks=seq(0, maxsize+4, by=4),
       main = paste("ZL=", i, ", n=", nrow(df2), ", max=", round(maxsize), " kb", sep=""))
  abline(v=maxsize, col=2)
}
```

## 参考文献
* protomaps/PMTiles https://github.com/protomaps/PMTiles
