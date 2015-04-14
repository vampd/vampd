(function($){

  function toggleInput(bool, id) {
    if ($(bool).is(':checked')) {
      $(id + ' label').addClass('required');
      $(id).show();
    }
    else {
      $(id).hide();
      $(id +' label').removeClass('required');
    }
  }

  // Hide db location or profile unless it is showing.
  $('#actions input').on('change', function (e){
    toggleInput('#action_import', '#db_file');
    toggleInput('#action_install', '#profile');
  });

  // Set up show/hide for git
  $('#git_bool').on('change', function(e) {
    toggleInput('#git_bool', '#git');
    $('#git_remotes label').removeClass('required');
  });
  // Set up git remotes handling
  $('#git_remotes_bool').on('change', function(e) {
    toggleInput('#git_remotes_bool', '#git_remotes_fields');
  });

  // Set the file directory, it is subject to change
  var files = $('#settings_files').val();
  // Set up show/hide for docroot
  $('#docroot_bool').on('change', function(e) {
    toggleInput('#docroot_bool', '#docroot_path');
  });

  // On docroot change update the file location to reflect default
  $('#settings_docroot').on('change', function(e) {
    var docroot = $(this).val();
    var docroot_before = '';
    if (docroot != '') {
      var docroot_before = docroot + '/';
    }
    var files = $('#settings_files').val();
    var settings = $('#settings_settings').val();
    if (files == 'sites/default/files') {
      $('#settings_files').val(docroot_before + files);
    }
    if (settings == 'sites/default/settings.php') {
      $('#settings_settings').val(docroot_before + settings);
    }
  });
  // Set up the additional settings.php
  $('#settings_add_bool').on('change', function(e) {
    toggleInput('#settings_add_bool', '#settings_add_fields');
  });
  // Drush Make
  $('#drush_make_bool').on('change', function(e) {
    toggleInput('#drush_make_bool', '#drush_make_fields');
    $('#drush_make_files label').removeClass('required');
  });
  // Drush Make files
  $('#drush_make_file_bool').on('change', function(e) {
    toggleInput('#drush_make_file_bool', '#drush_make_file_fields');
  });

})(jQuery)
