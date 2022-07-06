# GASformakesurvey
Google app script for makesurvey android application 

# Kodlama 
Öncelikle firebase sistemini eklemeniz gerekli. Bu işlemi library sekmesinden aratarak yapabilirsiniz.Baseurl ve secret bölümünü kendiniz eklemelisiniz.

GAS dosyası içerisinde doPost adında bir fonsiyon yazıyoruz. doPost volley kütüphanesiyle etkileşime geçtiğimiz fonksiyondur. Parametresi olan e bizim voleyle yolladığımız parametrelere eriştiğimiz veridir.
 

Satır 11'deki komut ile yeni Google Form oluşturulur.
 

satır 19 komutuyla bloğunda soru tarzına göre Google Forma soru oluşturulur.

 

satır 47 komut ile oluşturduğumuz Google Forma bir tetikleyici ekleniyor. Google Forma ne zaman bir yanıt eklendiğinde tetiklenir olarak ayarlanır. Tetiklendiği zaman onFormSubmit adındaki fonksiyonumuz çalışır.
 

satır 59 komut ile ankete yapılan cevabı alırız.
 

satır 156 komut ile veri tabanımıza cevap kaydedilir.
