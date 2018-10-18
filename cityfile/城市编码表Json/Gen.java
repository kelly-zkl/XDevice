package org.changs.xlsx2json;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.SerializedName;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


/**
 * dependencies {
 * compile group: 'org.apache.poi', name: 'poi-ooxml', version: '3.17'
 * compile group: 'org.apache.poi', name: 'poi', version: '3.17'
 * compile group: 'com.google.code.gson', name: 'gson', version: '2.8.2'
 * }
 */
public class Gen {

    public static void main(String[] args) {
        String filePath = "高德地图API 城市编码表.xlsx";
        String columns[] = {"名称", "adcode", "citycode"};
        Workbook wb = readExcel(filePath);
        if (wb == null) {
            System.err.println("文件不存在");
            return;
        }
        Sheet sheet = null;
        Row row = null;
        String cellData = null;
        //用来存放表中数据
        List<Map<String, String>> list = new ArrayList<>();
        //获取第一个sheet
        sheet = wb.getSheetAt(1);
        //获取最大行数
        int rownum = sheet.getPhysicalNumberOfRows();
        //获取第一行
        row = sheet.getRow(0);
        //获取最大列数
        int colnum = row.getPhysicalNumberOfCells();
        for (int i = 1; i < rownum; i++) {
            Map<String, String> map = new LinkedHashMap<>();
            row = sheet.getRow(i);
            if (row != null) {
                for (int j = 0; j < colnum; j++) {
                    cellData = (String) getCellFormatValue(row.getCell(j));
                    map.put(columns[j], cellData);
                }
            } else {
                break;
            }
            list.add(map);
        }

        List<City> result = new ArrayList<>(list.size());
        //遍历解析出来的list
        City province = null, city = null, district;
        for (Map<String, String> map : list) {
            String name = map.get("名称");
            String adcodeStr = map.get("adcode");
            int adcode = Integer.valueOf(adcodeStr);
            String citycode = map.get("citycode");
            if (adcode % 10000 == 0) {//省
                province = new City(name, adcodeStr, citycode, "1");
                result.add(province);
                city = null;
            } else if (adcode % 100 == 0) {//市
                assert province != null;
                city = new City(name, adcodeStr, citycode, "2");
                province.getNotNullChild().add(city);
            } else {//区
                assert province != null;
                district = new City(name, adcodeStr, citycode, "3");
                if (city == null) {
                    province.getNotNullChild().add(district);
                } else {
                    city.getNotNullChild().add(district);
                }
            }
            System.out.println();
        }

        Gson gson = new GsonBuilder()
//                .setPrettyPrinting()
                .create();
        String jsonStr = gson.toJson(result);
        write2File(jsonStr, "city-zip.json");
        System.out.println("---OKOKOK---");

    }

    //读取excel
    public static Workbook readExcel(String filePath) {
        Workbook wb = null;
        if (filePath == null) {
            return null;
        }
        String extString = filePath.substring(filePath.lastIndexOf("."));
        InputStream is = null;
        try {
            is = new FileInputStream(filePath);
            if (".xls".equals(extString)) {
                return wb = new HSSFWorkbook(is);
            } else if (".xlsx".equals(extString)) {
                return wb = new XSSFWorkbook(is);
            } else {
                return wb = null;
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return wb;
    }

    public static Object getCellFormatValue(Cell cell) {
        Object cellValue = null;
        if (cell != null) {
            //判断cell类型
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_NUMERIC: {
                    cellValue = String.valueOf(cell.getNumericCellValue());
                    break;
                }
                case Cell.CELL_TYPE_FORMULA: {
                    //判断cell是否为日期格式
                    if (DateUtil.isCellDateFormatted(cell)) {
                        //转换为日期格式YYYY-mm-dd
                        cellValue = cell.getDateCellValue();
                    } else {
                        //数字
                        cellValue = String.valueOf(cell.getNumericCellValue());
                    }
                    break;
                }
                case Cell.CELL_TYPE_STRING: {
                    cellValue = cell.getRichStringCellValue().getString();
                    break;
                }
                default:
                    cellValue = "";
            }
        } else {
            cellValue = "";
        }
        return cellValue;
    }

    public static void write2File(String msg, String filePath) {
        File file = new File(filePath);
        System.out.println("file.getAbsolutePath() = " + file.getAbsolutePath());
        try (FileWriter fileWriter = new FileWriter(filePath)) {
            fileWriter.write(msg);
            fileWriter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public static class City {
        @SerializedName("n")
        public String name;
        @SerializedName("o")
        public String code;
        @SerializedName("u")
        public String number;
        @SerializedName("t")
        public String type;//省1，市2，区，3
        @SerializedName("c")
        public List<City> child;

        public City(String name, String code, String number, String type) {
            this.name = name;
            this.code = code;
            this.number = number;
            this.type = type;
        }


        public List<City> getNotNullChild() {
            if (child == null) child = new ArrayList<>();
            return child;
        }
    }
}
