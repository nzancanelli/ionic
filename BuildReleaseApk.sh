# Procedimento para geração de apk para publicação na loja Google Play 
sudo ionic platform rm android
sudo ionic platform add android
sudo chmod -R 777 /Users/macbook/Ionic/app_hospitaisAmericas/platforms
cd resources/keystore/keystoreamericas
cp release-key.keystore /Users/macbook/ionic/app_hospitaisamericas/platforms/android
cp release-signing.properties /Users/macbook/ionic/app_hospitaisamericas/platforms/android
cd /Users/macbook/ionic/app_hospitaisamericas
sudo ionic build android --release
sudo chmod -R 777 /Users/macbook/Ionic/app_hospitaisAmericas/platforms
rmdir platforms/android/build/outputs/apk
mkdir platforms/android/build/outputs/apk
cd platforms/android/build/outputs/apk
rm -r app-hospitalAmericas-release.apk
/Users/macbook/Android/sdk/build-tools/25.0.2/zipalign -v 4 android-release.apk app-hospitalAmericas-release.apk
rm -r android-release.apk
rm -r android-release-unaligned.apk