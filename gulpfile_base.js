let gulp = require("gulp");
gulp.task("hello",function(a){
    console.log("HELLO :)");
    a();
});
gulp.task("hi",function(a){
    console.log("HI :(");
    a();
});
gulp.task("default",function(a){
    console.log("DEFAULT ::::::");
    a();
});
gulp.task("all",gulp.series("default","hi","hello"));