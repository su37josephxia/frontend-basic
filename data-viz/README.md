# 数据可视化与图形语法

## 一、什么是数据可视化

数据可视化就是用视觉图形手段来表达数据中的信息。

常言讲“一图胜前言” ，视觉识别是人类的本能，是最有效最自然的表达手段。

## 二、数据可视化的历史

### 1. 18世纪 William Playfair 发明的几种常用统计图表

![image-20201101123627655](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201101123627655.png)

### 2. 南丁格尔19世纪50年代绘制的“玫瑰图”

![image-20201101123902355](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201101123902355.png)

### 3. 法国工程师 Charles Joseph Minard 1861年绘制的“拿破仑东征”

![image-20201101123955942](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201101123955942.png)



### 4. 图形语法的萌芽

法国制图师 Jacques Bertin 在研究了大量的图表案例之后，发表了可视化图表设计与制图的奠基之作《the Semiology of Graphics》

![image-20201101124215610](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201101124215610.png)

### 5. 图形语法的诞生

[Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson) 在上世纪80年代开始开发 SYSTAT 的统计图形软件包时，也遇到了这个问题。最初的版本是枚举每一个能收集到的统计图形，最终代码量非常大，约 1.5M 左右。90年代初，他基于面向对象重构了这个项目，以一种树形结构管理图形元素，得到了更易扩展和动态的结果。这时软件包的大小下降到了 1M 以内。到了90年代末期，他和几个统计学家、计算机学家合作基于之前的工作开发了统计图形绘图工具 [GPL](http://www.unige.ch/ses/sococ/cl/spss/graph/gpl.html)。这个 Java 版本的软件代码量下降到了 0.5M 以下，并且沉淀出了一套稳定可靠的架构。

![image-20201101124502181](https://gitee.com/josephxia/picgo/raw/master/juejin/image-20201101124502181.png)





最近，开始整理可视化文档。

对于一个前端工程师一般都或多或少的做过数据可视化项目。

前端工程师的可视化工作可以将数据通过可视化库转化为图形。
常用的可视化库包括D3、Highcharts、Echarts等等。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc3de218f03c40f48f03666ea44b6e34~tplv-k3u1fbpfcp-watermark.image)

但是你会发现可视化库越来越多

## 三、图形语法

《The Grammar of Graphics》就是 Wilkinson 在开发这套可视化软件的时候编写的，既有他对无数统计图表分析研究后的理论总结，也不乏实现图形语法的软件架构细节。至此，用一套语法描述任意图形的方法诞生了，编写基于图形语法的软件包有了理论依据和设计实践指导。

根据这本书的描述，统计图形的定义依靠以下几个基础语法：

| 声明    | 描述                                      |
| ------- | ----------------------------------------- |
| DATA    | 从数据集生成视觉编码的数据操作            |
| TRANS   | 视觉编码变换（譬如rank）                  |
| SCALE   | 度量变换（譬如log）                       |
| COORD   | 定义坐标系（譬如极坐标）                  |
| ELEMENT | 图形（譬如点图）及其视觉属性（譬如color） |
| GUIDE   | 辅助元素（譬如legend）                    |

## 四、G2实战

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <script src="https://gw.alipayobjects.com/os/lib/antv/g2/4.0.11/dist/g2.min.js"></script>
    <script src="https://unpkg.com/@antv/data-set"></script>
    <script src="https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js"></script>
  </head>

  <body>
    <!-- 创建图表容器 -->
    <div id="c1"></div>
    <script>
      const data = [
        { city: "北京", number: 40 },
        { city: "上海", number: 21 },
        { city: "广州", number: 17 },
        { city: "青岛", number: 13 },
        { city: "武汉", number: 9 },
      ];
      const dv = new DataSet.View()
        .source(data) // 载入数据
        .transform({
          // 数据处理：统计每一个 key 对应数值 value 占总和的比例
          type: "percent",
          field: "number",
          dimension: "city",
          as: "percent",
        });
      console.log('transform',dv)
      const chart = new G2.Chart({
        container: "c1",
        autoFit: true,
        height: 500,
      });

      chart
        .coordinate("polar").transpose(); // 反转极坐标

      chart.data(dv.rows);

      chart.scale("percent", {
        formatter: (val) => {
          val = val * 100 + "%";
          return val;
        },
      }); // 度量变换

      chart
        .interval()
        .position("percent") // 位置映射
        .color("city") // 颜色映射
        .label("percent", {
          content: (data) => {
            return `${data.city}: ${data.percent * 100}毫米`;
          },
        }) 

      chart.render();
    </script>
  </body>
</html>

```

