let gulp = require("gulp");
//实现文件的拷贝和删除

let app = {
    src:"./src",
    dist:"./dist"
}

//实现src拷贝至dist/src
gulp.task("copy",function(done){
    //gulp.src(app.src)                 //只会拷贝src目录
    //gulp.src(app.src + "/*")          //只会拷贝src目录下的一级内容（子文件夹内容不会被拷贝）
    //gulp.src(app.src + "/**")         // 会拷贝src目录下的所有内容（src目录没有创建）
        
    gulp.src(app.src)
        .pipe(gulp.dest(app.dist));
    gulp.src(app.src + "/**")
        .pipe(gulp.dest(app.dist + "/src"));
    
    done();
});


//实现选择拷贝

gulp.task("copy2",function(done){
    gulp.src(app.src + "/js")        //拷贝src 目录下的 js文件夹
        .pipe(gulp.dest(app.dist));
    gulp.src(app.src +"/css")        //拷贝src 目录下的 css文件夹
        .pipe(gulp.dest(app.dist));

    gulp.src(app.src + "/js/**")
        .pipe(gulp.dest(app.dist + "/js"));
    gulp.src(app.src + "/css/**")
        .pipe(gulp.dest(app.dist + "/css"));
    
    done();
});


//[]组合:实现一组指定内容
//剔除:不需要的内容

gulp.task("copy3",function(done){
    gulp.src([`${app.src}/*`,`!${app.src}/js`,`!${app.src}/.css`])
        .pipe(gulp.dest(app.dist));  
    
    done();
});


//只要导出项目中的所有页面
//方法一
gulp.task("copy4",function(done){
    gulp.src([`${app.src}/**/*.html`,`${app.src}/**/*.htm`])
        .pipe(gulp.dest(app.dist));
   
   
    done();
});


//方法二
//枚举{}：指定的几个值
gulp.task("copy5",function(done){
   gulp.src(`${app.src}/**/*.{htm,html}`)
        .pipe(gulp.dest(app.dist));

    done();
});


// 实现删除功能

// npm i gulp-clean --save-dev


//导入第三方组件

let clean = require("gulp-clean");

//删除内容
gulp.task("clean1",function(done){
   gulp.src(app.dist + "/*")        //这里不要使用/** （仅在copy子目录内容时使用）
         .pipe(clean());
    done();
});

//删除目录
gulp.task("clean2",function(done){
   gulp.src(app.dist)       
         .pipe(clean());
    done();
});

// 选择删除
gulp.task("clean3", function(done) {
    // gulp.src([`${app.dist}/**/*.html`, `${app.dist}/**/*.htm`])
    gulp.src(`${app.dist}/**/*.{htm,html}`)
        .pipe(clean());
    done();
});

//html 压缩
//npm i gulp-htmlmin -D
let htmlmin = require("gulp-htmlmin");

gulp.task("htmlmin",function(done){
    gulp.src(`${app.src}/**/*.{htm,html}`)
          .pipe(htmlmin({
                removeComments:true,
                collapseWhitespace:true,
                collapseBooleanAttributes:true,
          }))
          .pipe(gulp.dest(app.dist))  
    
    done();
});

//css 压缩
//npm i gulp-cssmin -D
let cssmin = require("gulp-cssmin");

gulp.task("cssmin",function(done){
    gulp.src(`${app.src}/**/*.css`)
          .pipe(cssmin({
                removeComments:true,
                collapseWhitespace:true,
                collapseBooleanAttributes:true,
          }))
          .pipe(gulp.dest(app.dist))  
    
    done();
});

//js 混淆压缩
//npm i gulp-uglify-es -D
let { default: jsmin } = require("gulp-uglify-es");

gulp.task("jsmin", function(done) {
    gulp.src(`${app.src}/**/*.js`)
        .pipe(jsmin())
        .pipe(gulp.dest(app.dist));

    done();
});


//文件重命名(实现src拷贝到bak目录下，所有文件后缀名都附加一个.bak)
//npm i gulp-rename -D

let rename = require("gulp-rename");

gulp.task("rename",function(done){
   gulp.src(`${app.src}/**`)
       .pipe(rename(function(target,info){
           console.log(target,typeof info);
           if(target.extname)
               target.extname += ".bak";
       }))
       .pipe(gulp.dest(app.dist));
   
    done();
});


//文件合并
//npm i gulp-concat -D
let concat = require("gulp-concat");

//将src目录下的所有css文件合并为all.css
gulp.task("concat", function(done) {
    gulp.src(`${app.src}/*.css`)
        .pipe(concat("all.css"))
        .pipe(cssmin())
        .pipe(gulp.dest(app.dist));

    done();
});

//less 编译
//npm i gulp-less -D

let less = require("gulp-less");

// 将src/less/*.less编译到dist/css/*.css
gulp.task("less1",function(done){
   gulp.src(`${app.src}/less/*.less`)
      .pipe(less())
      .pipe(concat("all.css"))
      .pipe(cssmin())
      .pipe(rename("all.min.css"))
      .pipe(gulp.dest(app.dist + "/css"));
   
    done();
});

