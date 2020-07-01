import { Component } from "@angular/core";
import { init, errorCodes } from "../assets/anyline.js";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  anylicense =
    "ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9wdC1vdXQiLAogICJpbWFnZVJlcG9ydENhY2hpbmciOiB0cnVlLAogICJtYWpvclZlcnNpb24iOiAiNCIsCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDAsCiAgInBpbmdSZXBvcnRpbmciOiB0cnVlLAogICJwbGF0Zm9ybSI6IFsKICAgICJKUyIKICBdLAogICJzY29wZSI6IFsKICAgICJBTEwiCiAgXSwKICAic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOiB0cnVlLAogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwKICAidG9sZXJhbmNlRGF5cyI6IDUsCiAgInZhbGlkIjogIjIwMjAtMDktMzAiLAogICJqc0lkZW50aWZpZXIiOiBbCiAgICAiZXUubmV4bW8ucHdhIgogIF0KfQpEVVN1VDhjN2k3cFVsOStnc0k1LzdsckpMVnR1aEVSL1pPdnByRUM0SVp3cE9KVFB6Y1dYWHNyWnhpWGx3ZWxyWHloMW5CNU9iYmVUd3JaazYwZks5bDhQeHdoRW5BQi9rdXc3aHRLckR1NWJGYWtxT09jZFByeHlaaWNDeWkzQzdMR0dpblZ1Tk45cnZQYjBaUks4N3llTHJkUXVyYjR0ZWdEUGZJL0o4Vkl4TWRaWEU0N3diRGRSTUx1RzVtRE53T1VQTk95dTJWczQvMm02b1Z0NmFNWGxIbWU0QWVnYXpzbDdkVEttdTNGTlBqUEQ0Sk5Dcng1UDRteVRSckt4eGZ1Vy9tWVM4dmttRVZRQ0ZIY3hPcnJnUnR3czI3V2t3R21zNStJUFhENzFGTzZqVzk5L1ZKMUpSdklzUThTWTVvKzRBMVVENGxpdlhVUm9vNWJEckE9PQ==";

  anyline;
  constructor() {}

  startScan() {
    const viewConfig = {
      outerColor: "000000",
      outerAlpha: 0.5,
      cutouts: [
        {
          cutoutConfig: {
            style: "rect",
            maxWidthPercent: "70%",
            alignment: "top_half",
            ratioFromSize: {
              width: 62,
              height: 9,
            },
            strokeWidth: 2,
            strokeColor: "FFFFFF",
            cornerRadius: 4,
            outerColor: "000000",
            outerAlpha: 0.3,
            feedbackStrokeColor: "0099FF",
          },
          scanFeedback: {
            animation: "traverse_multi",
            animationDuration: 250,
            style: "contour_rect",
            strokeWidth: 2,
            strokeColor: "0099FF",
            fillColor: "220099FF",
          },
        },
      ],
    };

    const container = document.getElementById("anylineContainer");

    this.anyline = init({
      preset: "vin",
      viewConfig,
      license: this.anylicense,
      element: container,
      debugAnyline: true,
      anylinePath: "./assets/anylinejs",
    });

    this.anyline.startScanning();

    this.anyline.onResult = ({ image, fullImage, result }) => {
      console.log("result: ", result);
    };

    this.anyline.onReport = (report) => {
      console.log("anyLine Reports: ", report);
    };

    this.anyline.onError = ({ code, message }) => {
      if (code === errorCodes.WEBCAM_ERROR) {
        console.error("webcam error: ", message);
      }
    };

    this.anyline.onLoad = () => {
      console.log("Anyline Finished Loading");
    };
  }
}
