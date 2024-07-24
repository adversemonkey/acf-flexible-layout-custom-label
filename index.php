<?php

    /*
    Plugin Name: ACF Flexible Labelled
    Plugin URI:
    Description:
    Version: 1
    Author: Alessandro Monopoli
    Author URI:
    Disclaimer:
    Text Domain:
    License: GPLv2 or later
    */

    /*
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    */

    // If this file is called directly, abort.
    if ( ! defined( 'WPINC' ) ) {
        die;
    }

    function ACFFL_include_assets() {
        wp_register_script( 'ACFFL_scripts', 	plugins_url( 'ACFFL_scripts.js', __FILE__ ), array(), time(), 'all' );
        wp_enqueue_script( 'ACFFL_scripts' );
        wp_localize_script('ACFFL_scripts', 'ACFFL_settings', [
            'nonce' => wp_create_nonce('wp_rest'),
        ]);

        wp_register_style( 'ACFFL_styles', plugins_url( 'ACFFL_styles.css', __FILE__ ) );
        wp_enqueue_style( 'ACFFL_styles' ); 
    }

    // includo assets
    add_action( 'admin_enqueue_scripts', 'ACFFL_include_assets', 201 );
    
    
    // ACF

    add_action( 'acf/include_fields', function() {
        if ( ! function_exists( 'acf_add_local_field_group' ) ) {
            return;
        }
        $file_contents = file_get_contents( __DIR__ . '/group_66a0aae6b9220.json' );
        $aField = json_decode( $file_contents, true );
        acf_add_local_field_group($aField);
    });