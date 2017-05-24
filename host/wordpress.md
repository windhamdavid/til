# Wordpress


##### Determine the current Taxonomy and list it's children.    

{%ace edit=true, lang='php' theme='tomorrow_night_blue'%}

<?php
$term = get_term_by( 'slug', get_query_var('term'), get_query_var('taxonomy') );
$queried_object = get_queried_object();
$term_id = $queried_object->term_id;
$taxonomy_name = 'location';
$term_children = get_term_children( $term_id, $taxonomy_name );
if ( !empty( $term_children ) && !is_wp_error( $term_children ) ) { ?>
  <div class="togglecontainer">

    <?php echo '<ul>';
    foreach ( $term_children as $child ) {
      $term = get_term_by( 'id', $child, $taxonomy_name );
      echo '<li><a href="' . get_term_link( $child, $taxonomy_name ) . '">' . $term->name . '</a></li>';
      echo '<li><a href="' . get_term_link( $child, $taxonomy_name ) . '">' . get_term_meta( $term->term_id, 'address', true ) . '</a></li><br />';
    }
    echo '</ul>'; ?>

  </div>
<?php } ?>

{%endace%}  
