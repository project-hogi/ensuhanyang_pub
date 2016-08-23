<?php
function echoJsInPath($path) {
	$realPath = $_SERVER ['DOCUMENT_ROOT'] . $path;
	
	if (! is_dir ( $realPath )) {
		return;
	}
	
	$h = opendir ( $realPath );
	
	while ( false !== ($file = readdir ( $h )) ) {
		if ($file == '.' || $file == '..') {
			continue;
		}
		
		if (is_dir ( $realPath . $file )) {
			echoJsInPath ( $path . $file . '/' );
			
			continue;
		}
		
		if (strpos ( $file, '.js' ) === false)
			continue;
		
		echo '<script src="' . $path . $file . '"></script>
';
	}
}
function getBodyClass($classString) {
	global $pagePath;
	
	$namePartList = explode ( "-", str_replace ( ".php", "", basename ( $pagePath ) ) );
	
	$pageClaseList = [ ];
	
	if (! $pagePath) {
		$pageClaseList [] = "{pageClasses}";
	} else {
		for($i = 0; $i < count ( $namePartList ); $i ++) {
			$arr = [ ];
			$arr [] = "page";
			
			for($j = 0; $j <= $i; $j ++) {
				$arr [] = $namePartList [$j];
			}
			
			$pageClaseList [] = implode ( "-", $arr );
		}
	}
	
	$pageClassList2 = explode ( " ", $classString );
	
	return implode ( " ", array_unique ( array_merge ( $pageClaseList, $pageClassList2 ) ) );
}
function getBodyClassByPath($pagePath) {
	$namePartList = explode ( "-", str_replace ( ".php", "", basename ( $pagePath ) ) );
	
	$pageClaseList = [ ];
	
	if (! $pagePath) {
		$pageClaseList [] = "{pageClasses}";
	} else {
		for($i = 0; $i < count ( $namePartList ); $i ++) {
			$arr = [ ];
			$arr [] = "page";
			
			for($j = 0; $j <= $i; $j ++) {
				$arr [] = $namePartList [$j];
			}
			
			$pageClaseList [] = implode ( "-", $arr );
		}
	}
	
	return implode ( " ", $pageClaseList );
}
function getDepthId($depth) {
	global $pagePath;
	
	$namePartList = explode ( "-", str_replace ( ".php", "", basename ( $pagePath ) ) );
	
	return isset ( $namePartList [$depth] ) ? $namePartList [$depth] : null;
}