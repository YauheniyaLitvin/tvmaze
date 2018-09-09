<show-list>
    <div each={ shows }>
        <div class='show-name'>{ name }</div>
        <cast-list casts={ cast }><cast-list>
    </div>

<script>
    const tag = this 
    tag.shows = opts.shows
    
</script>

</show-list>