city-zip.json 是压缩后的json文件
参数释义：
	@SerializedName("n")
        public String name;
        @SerializedName("o")
        public String code;
        @SerializedName("u")
        public String number;
        @SerializedName("t")
        public String type;//省1，市2，区3
        @SerializedName("c")
        public List<City> child;