<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInite377133d877ed410a9a337927dee642a
{
    public static $prefixLengthsPsr4 = array (
        'Z' => 
        array (
            'Zend\\Stdlib\\' => 12,
            'Zend\\Console\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Zend\\Stdlib\\' => 
        array (
            0 => __DIR__ . '/..' . '/zendframework/zend-stdlib/src',
        ),
        'Zend\\Console\\' => 
        array (
            0 => __DIR__ . '/..' . '/zendframework/zend-console/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInite377133d877ed410a9a337927dee642a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInite377133d877ed410a9a337927dee642a::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}