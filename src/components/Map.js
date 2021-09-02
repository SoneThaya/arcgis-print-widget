import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

const Map = () => {
  const MapEl = useRef(null);

  useEffect(() => {
    loadModules([
      "esri/views/MapView",
      "esri/widgets/Print",
      "esri/WebMap",
    ]).then(([MapView, Print, WebMap]) => {
      var webmap = new WebMap({
        portalItem: {
          // autocasts as new PortalItem()
          id: "d6d830a7184f4971b8a2f42cd774d9a7",
        },
      });

      var view = new MapView({
        container: "viewDiv",
        map: webmap,
      });

      view.when(function () {
        var print = new Print({
          view: view,
          // specify your own print service
          printServiceUrl:
            "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
        });

        // Add widget to the top right corner of the view
        view.ui.add(print, "top-right");
      });
    });
  }, []);

  return (
    <div
      id="viewDiv"
      style={{ height: "100vh", width: "100vw" }}
      ref={MapEl}
    ></div>
  );
};

export default Map;
