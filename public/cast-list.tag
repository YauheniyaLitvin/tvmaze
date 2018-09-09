<cast-list>
    <div each={ casts } class="field">
        <label>{ name }</label><span>  { dob( birthday ) } - { age( birthday ) } </span>
    </div>
<script>
    const tag = this
    tag.casts = opts.casts || []
    
    const today = new Date()
    tag.dob = birthday => ( new Date( birthday ) ).toLocaleDateString()
    tag.age = birthday => { 
        const dob = new Date( birthday )
        let age = today.getFullYear() - dob.getFullYear()
        const m = today.getMonth() - dob.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--
        }
        return age
    }
</script>
</cast-list>