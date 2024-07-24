(function($) {
    var ACFFL_values = {};
    var ACFFL_timeout = null;
    var ACFFL_initialized = false;
    var ACFFL_interval = null;

    $(document).on("change", ".ui-sortable", function() {
        if (ACFFL_initialized) {
            if (ACFFL_timeout) clearTimeout(ACFFL_timeout);
            ACFFL_timeout = setTimeout(updateLabels,100);   
        }
    });

    $(document).on("keyup", ".acf-flexible-content-label input", function() {
        updateLabels();    
    });

    $(document).on("ready", function() {
        if ($(".acf-field[data-name='acffl_labels']").length) {
            var strLabels = $(".acf-field[data-name='acffl_labels'] textarea").val();
            if (strLabels) ACFFL_values = JSON.parse(strLabels);
        }
    });

    $(window).on("load", function() {
        createLabels();

        ACFFL_interval = setInterval(function() {
            createLabels();
            updateLabels();
        }, 400);
    });

    function createLabels() {
        $(".acf-flexible-content .values .layout").each(function(i) {
            if (!$(this).find(".acf-flexible-content-label").length) {
                $(this).prepend("<span class='acf-flexible-content-label'><span>label</span><input type='text' name='ACFFL_label'></span>");

                var label = '';
                if (ACFFL_values[i]) {
                    label = ACFFL_values[i];
                } else {
                    label = getNativeLabel($(this));
                }
                
                $(this).find(".acf-flexible-content-label > span").text(label);
                $(this).find(".acf-flexible-content-label > input").val(label);
            }
        });
        ACFFL_initialized = true;
    }

    function updateLabels() {
        ACFFL_values = {};
        $(".acf-flexible-content .values .layout").each(function(i) {
            var label = $(this).find("> .acf-flexible-content-label input").val();
            if (label != getNativeLabel($(this))) ACFFL_values[i] = label;
            $(this).find("> .acf-flexible-content-label span").text(label);
        });
        var strLabels = JSON.stringify(ACFFL_values);
        $(".acf-field[data-name='acffl_labels'] textarea").val(strLabels);
    }

    function getNativeLabel(layout) {
        var handleCloned = layout.find("> .acf-fc-layout-handle").clone();
        handleCloned.find("span").remove();
        return $.trim(handleCloned.text());
    }

})(jQuery);