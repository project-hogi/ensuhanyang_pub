<?php
require_once "lib.php";

$config['isBuild'] = true;

@mkdir("../html");
@mkdir("../html/views");

requirePhpInPath("views", "../html/views");

fileCopy("index.html", "../html/index.html");
fileCopy("css", "../html/css");
fileCopy("fonts", "../html/fonts");
fileCopy("img", "../html/img");
fileCopy("js", "../html/js");

function requirePhpInPath($inputDir, $outputDir)
{
    $realPath = __DIR__ . "/" . $inputDir;
    
    if (! is_dir($realPath)) {
        return;
    }
    
    $h = opendir($realPath);
    
    while (false !== ($file = readdir($h))) {
        if ($file == '.' || $file == '..') {
            continue;
        }
        
        if (strpos($file, '.php') === false)
            continue;
        
        requirePhp($inputDir . "../" . $file, $outputDir . "../" . str_replace(".php", ".html", $file));
    }
}

function requirePhp($input, $output)
{
    global $config;
    
    ob_start();
    
    require $input;
    $content = ob_get_contents();
    $content = str_replace("{pageClasses}", getBodyClassByPath($input), $content);
    $content = str_replace("../resources", "../resources", $content);
    $content = str_replace(".php", ".html", $content);
    
    ob_end_clean();
    
    $dirname = dirname(__DIR__ . "../" . $output);
    if (! is_dir($dirname)) {
        mkdir($dirname, 0755, true);
    }
    
    $handle = fopen(__DIR__ . "../" . $output, "w");
    fwrite($handle, $content);
    fclose($handle);
}

function fileCopy($odir, $ndir)
{
    if (filetype($odir) === 'dir') {
        clearstatcache();
        
        @mkdir($ndir);
        
        if ($fp = @opendir($odir)) {
            while (false !== ($ftmp = readdir($fp))) {
                if (($ftmp !== ".") && ($ftmp !== "..") && ($ftmp !== "")) {
                    if (filetype($odir . '/' . $ftmp) === 'dir') {
                        clearstatcache();
                        
                        set_time_limit(0);
                        fileCopy($odir . '/' . $ftmp, $ndir . '/' . $ftmp);
                    } else {
                        copy($odir . '/' . $ftmp, $ndir . '/' . $ftmp);
                    }
                }
            }
        }
        if (is_resource($fp)) {
            closedir($fp);
        }
    } else {
        copy($odir, $ndir);
    }
}
?>
성공