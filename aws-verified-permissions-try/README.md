# verified permissions

- 権限管理のサービス
- 認証は別
  - cognito や外部の idp を使う想定
- principal, resource, action により制御できる
  - 自前でもできるけど、この3セットをチェックするのは、けっこう網羅が難しい印象
  - なので、きめ細やかに権限管理したいとき特に有用
  - あと、権限の追加/削除をawsコンソールで行える (=動的に削除等もできる) のはメリットかも
- 個人的には、こういうのを自前で制御するとカオスになるので、こういうのに乗っかるのはアリだと思った。

## Links
- https://pages.awscloud.com/rs/112-TZM-766/images/20230906_reInforce2023_ISV_DiveDeepSeminar_shibary_AVP.pdf
