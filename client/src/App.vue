<template>
    <div id="My-app">
            <div id="les-parties" @click="methodSyrius(partie.id)" v-bind:key="partie" v-for="partie in parties">
                <div id="partie-1" >
                    <div>Nom de la partie: {{ partie.name }}</div>
                    <div>Niveau de la partie: {{partie.level}}</div>
                    <div>{{partie.nb}}</div>
                    <div>Nombre joueurs Max: {{partie.max_users}}</div>
                </div>
            </div>
    </div>
    
</template>

<script>
import { joinSiriusGame } from './sirius-api';
export default{
    data () {
		return {
			parties : []
		}
	},

    methods: {
		addGame(partie) {
			this.parties.push(partie);
		},
        
        methodSyrius(partie){
            joinSiriusGame(partie);
        }
	}
}
</script>

