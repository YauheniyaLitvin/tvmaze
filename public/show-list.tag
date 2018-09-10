<show-list>
    <div each={ shows }>
        <div class='show-name'> {id}. { name }</div>
        <div class='show-main'>
            <img class='show-img' src={ image.medium }>
            <cast-list class='show-cast' casts={ cast }><cast-list>
        </div>
        
    </div>

<script>
    const tag = this 
    tag.shows = opts.shows
    
</script>

</show-list>