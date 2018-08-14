<template>
  <div id="container" style="width: 100%;height:400px"></div>
</template>
<script>
  export default {
    data() {
      return {
        position: {},
        map: {},
        geolocation: {},
        marker: {}
      }
    },
    methods: {
      setLocation() {
        this.$emit('getLocation', this.position);
      },
    },
    mounted() {
      let _this = this;
      //加载地图，调用浏览器定位服务
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 11,
        dragEnable: true
      });
      this.map.plugin(['AMap.Geolocation', 'AMap.ToolBar', 'AMap.Scale'], function () {
        _this.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        _this.map.addControl(_this.geolocation);
        _this.geolocation.getCurrentPosition();
        AMap.event.addListener(_this.geolocation, 'click', onComplete);      //定位按钮点击事件
        AMap.event.addListener(_this.geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(_this.geolocation, 'error', onError);      //返回定位出错信息

        _this.map.addControl(new AMap.ToolBar());
        _this.map.addControl(new AMap.Scale())
      });

      this.map.on('click', function (e) {
        _this.map.clearMap();  // 清除地图覆盖物

        _this.marker = new AMap.Marker({
          icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: [e.lnglat.getLng(), e.lnglat.getLat()]
        });
        _this.marker.setMap(_this.map);

        _this.position = e.lnglat;
        _this.setLocation();
      });

      //解析定位结果
      function onComplete(data) {
        _this.map.clearMap();  // 清除地图覆盖物

        _this.marker = new AMap.Marker({
          icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: [data.position.getLng(), data.position.getLat()]
        });
        _this.marker.setMap(_this.map);
        _this.position = data.position;
        _this.setLocation();
      }

      //解析定位错误信息
      function onError(data) {
        _this.position = {};
        _this.setLocation();
      }
    }
  }
</script>
