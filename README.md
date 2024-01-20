# tile-dist-from-pmtiles
PMTiles からタイルの統計データ（データの分布）を取得する

* `getStat.js` が主となるツールです。PMTiles の directory を読み出して、csv （`stat.csv`）として出力します。
* `matching.js` は、`stat.csv` を mokuroku の csv データと結合して一つのデータとするためのものです。
* `list2poly.js` 及び `tiler.js` は、`stat.csv` を地図表示用のベクトルタイルへ変換します。

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
