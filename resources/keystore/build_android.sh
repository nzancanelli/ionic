
cp release-key.keystore /Users/macbook/ionic/app_hospitaisamericas/platforms/android
cp release-signing.properties /Users/macbook/ionic/app_hospitaisamericas/platforms/android
cd /Users/macbook/ionic/app_hospitaisamericas
ionic build android --release
cd /platforms/android/build/outputs/apk
rm -r app-hospital-release.apk
sudo /Users/macbook/Android/sdk/build-tools/25.0.2/zipalign -v 4 android-release.apk app-hospital-release.apk
rm -r android-release.apk
rm -r android-release-unaligned.apk