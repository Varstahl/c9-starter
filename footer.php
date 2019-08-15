<?php

/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package cortextoo
 */

$the_theme = wp_get_theme();
?>

<?php get_sidebar('footerfull'); ?>

<?php if (file_exists(locate_template('client/inc/footer.php'))) {
    include(locate_template('client/inc/footer.php'));
} else { ?>

<div class="footer-wrapper" id="wrapper-footer">

    <div class="container">

        <div class="row">

            <div class="col-md-12">

                <footer class="site-footer" id="colophon">


                    <div class="site-info">

                        <div class="container">
                            <div class="row text-center">
                                <div class="col-xs-12">
                                    <p class="text-center">&copy; <?php echo date("Y") . ' ';
                                                                        echo bloginfo('name'); ?></p>
                                </div>
                            </div>
                        </div><!-- .container-->

                    </div><!-- .site-info -->

                </footer><!-- #colophon -->

            </div>
            <!--col end -->

        </div><!-- row end -->

    </div><!-- container end -->

</div><!-- wrapper end -->
<?php } //end of checking for client footer.php 
?>
</div><!-- #page we need this extra closing tag here -->
<div id="search">
    <button type="button" class="search-close accent-color-bg"><i class="fa fa-close"></i><span class="sr-only"><?php _e('Close', 'cortextoo'); ?></span></button>
    <form role="search" method="get" id="fullscreen" action="/">
        <div>
            <span class="sr-only"><?php _e('Search for:', 'cortextoo'); ?></span>
            <input type="search" class="search-field" name="s" value="" placeholder="<?php _e('Search...', 'cortextoo'); ?>" />
            <button type="submit" class="btn"><?php _e('Search', 'cortextoo'); ?></button>
        </div>
    </form>
</div>
<?php wp_footer(); ?>

</body>

</html>