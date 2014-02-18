/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package es.uned.epardo30.bubble;

import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

import org.apache.cordova.*;

import com.changeit.wmpolyfill.CordovaWebClient;
import com.changeit.wmpolyfill.WebClient;

public class Bubble extends CordovaActivity 
{
	WebView webview;
	WebClient wmp;
	
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        //super.init();
        
        webview = new WebView(this);
        printFeaturesToConsole();
        /** HERE the polyfill is enabled on the webview **/
		wmp = new WebClient(webview);
		
		
		
		// Hide the status bar at the top
				getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
				// Adds Progress bar Support
				getWindow().requestFeature(Window.FEATURE_PROGRESS);
				// Makes Progress bar Visible
				getWindow().setFeatureInt( Window.FEATURE_PROGRESS, Window.PROGRESS_VISIBILITY_ON);

				final Activity MyActivity = this;
				WebChromeClient wcc = new WebChromeClient() {
					@Override
					public void onProgressChanged(WebView view, int progress)
					{
						//Make the bar disappear after URL is loaded, and changes string to Loading...
						MyActivity.setTitle("Loading " + view.getUrl() + " ... ");
						MyActivity.setProgress(progress * 100); //Make the bar disappear after URL is loaded

						// Return the app name after finish loading
						if(progress == 100) {
							MyActivity.setTitle(R.string.app_name);
						}
					}

					@Override // since API Level 8
		        	public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
		        	    onConsoleMessage(consoleMessage.message(), consoleMessage.lineNumber(), consoleMessage.sourceId());
						return true;
					}

					@Override	// enable console.log javascript environment, will be sent to adb logcat
		        	public void onConsoleMessage(String message, int lineNumber, String sourceID) {
		        	    Log.v("wmp.console", message + " [Line "
		        	                         + lineNumber + "], Source: "
		        	                         + sourceID );
					}

					


//					@Override	// enable alert javascript, will generate native Android alert
//					public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
//						Alert alert = new Alert(view);
//						alert.show(message + ", Javascript Result ["+ result.toString() +"];");
//						return true;
//					}
				};
		
				webview.setWebChromeClient( wcc);
		setContentView(webview);
        // Set by <content src="index.html" /> in config.xml
        //super.loadUrl(Config.getStartUrl());
		webview.loadUrl("file:///android_asset/www/index.html");
    }
    
    public void printFeaturesToConsole()
	{
		String[] features = getMultiTouchFeatures();
		//for (int i = 0; i < features.length; ++i)
			//if (features[i] != null)
				//Log.d("wmp.console", features[i]);
	}

	private String[] getMultiTouchFeatures() {
		String[] s = new String[4];
		if (getPackageManager().hasSystemFeature(PackageManager.FEATURE_TOUCHSCREEN))
			s[0] = "Device has a Touchscreen";
		if (getPackageManager().hasSystemFeature(PackageManager.FEATURE_TOUCHSCREEN_MULTITOUCH))
			s[1] = "Device has a Touchscreen and knows basic gestures for two fingers";
		if (getPackageManager().hasSystemFeature(PackageManager.FEATURE_TOUCHSCREEN_MULTITOUCH_DISTINCT))
			s[2] = "Device has a Touchscreen and tracks at least 2 simultaneous fingers ";
		if (getPackageManager().hasSystemFeature(PackageManager.FEATURE_TOUCHSCREEN_MULTITOUCH_JAZZHAND))
			s[3] = "Device has a Touchscreen and tracks jazzy hands :) (>5 touches)";
		return s;
	}
    
}

