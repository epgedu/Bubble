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



import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.cordova.*;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;



public class Bubble extends Activity implements CordovaInterface 
{
	CordovaWebView cwv;
    private final ExecutorService threadPool = Executors.newCachedThreadPool();
    private int activityState = 0;  // 0=starting, 1=running (after 1st resume), 2=shutting down
    
 // Plugin to call when activity result is received
    protected CordovaPlugin activityResultCallback = null;
    protected boolean activityResultKeepRunning;
    
    private static final String TAG = "HelloWorld";
    /*
     * The variables below are used to cache some of the activity properties.
     */
 
 
    // Keep app running when pause is received. (default = true)
    // If true, then the JavaScript and native code continue to run in the background
    // when another application (activity) is started.
    protected boolean keepRunning = true;
    
    
    
    
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
    	super.onCreate(savedInstanceState);
    	
        setContentView(R.layout.main);
        cwv = (CordovaWebView) this.findViewById(R.id.mainView);
        Config.init(this);
        Log.v(TAG, "loadong bubble...");
        printFeaturesToConsole();
        
        
        
        cwv.loadUrl("file:///android_asset/www/index.html", 5000);
    }

    


    /**
     * Launch an activity for which you would like a result when it finished. When this activity exits,
     * your onActivityResult() method will be called.
     *
     * @param command           The command object
     * @param intent            The intent to start
     * @param requestCode       The request code that is passed to callback to identify the activity
     */
    @Override
    public void startActivityForResult(CordovaPlugin command, Intent intent, int requestCode) {
        this.activityResultCallback = command;
        this.activityResultKeepRunning = this.keepRunning;
 
        // If multitasking turned on, then disable it for activities that return results
        if (command != null) {
            this.keepRunning = false;
        }
 
        // Start activity
        super.startActivityForResult(intent, requestCode);
    }

	@Override
	public void setActivityResultCallback(CordovaPlugin plugin) {
        this.activityResultCallback = plugin;
    }

	@Override
	public Activity getActivity() {
        return this;
    }

	@Override
	public Object onMessage(String id, Object data) {
        return null;
    }

	@Override
	public ExecutorService getThreadPool() {
        return threadPool;
    }

	/**
	 * Prints the features of device about touch events
	 * @return
	 */
	public void printFeaturesToConsole()
	{
		String[] features = getMultiTouchFeatures();
		for (int i = 0; i < features.length; ++i)
			if (features[i] != null)
				Log.d("wmp.console", features[i]);
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

