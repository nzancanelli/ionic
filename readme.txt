Como gerar build para PlayStore:

1 - Cópiar os arquivos (release-key.keystore e release-signing.properties) de resources/keystore para platform/android

2- Executar os comandos:
	2.1 ionic build --release android
 	2.3 cd platforms/android/build/outputs/apk
 	2.4 /Users/amil/Library/Android/sdk/build-tools/24.0.2/zipalign -v 4 android-release.apk app-hospital-release.apk

ou
macbook
 sudo /Users/macbook/Android/sdk/build-tools/25.0.2/zipalign -v 4 android-release.apk app-hospital-release.apk


	ou execute o script resources/keystore/build_android.sh na raiz do projeto

	2.1 sh resources/keystore/build_android.sh

O build vai estar disponivel na pasta projeto/platforms/android/build/outputs/apk



sudo ionic platform rm android
sudo ionic platform add android
sudo chmod -R 777 /Users/macbook/Ionic/app_hospitaisAmericas/platforms
cd resources/keystore
cp release-key.keystore /Users/macbook/ionic/app_hospitaisamericas/platforms/android
cp release-signing.properties /Users/macbook/ionic/app_hospitaisamericas/platforms/android
cd /Users/macbook/ionic/app_hospitaisamericas
sudo ionic build android --release
cd platforms/android/build/outputs/apk
rm -r app-hospital-release.apk
/Users/macbook/Android/sdk/build-tools/25.0.2/zipalign -v 4 android-release.apk app-hospital-release.apk
rm -r android-release.apk
rm -r android-release-unaligned.apk

execute
bash BuildReleaseApk.sh



