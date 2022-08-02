// <!------------------------------------------------------------------------------------------------------------------------------------------------------->
// <!--------------------------------------------------------------- JAVASCRIPT TIPS & TRICKS -------------------------------------------------------------->
// <!------------------------------------------------------------------------------------------------------------------------------------------------------->

// <--------------------> IMPORTER DATA API <-------------------->

useEffect(() => {
  // --> Se joue a chaque fois que le composant est monté
  axios.get("...https").then((res) => {
    // --> axios ??? Cf doc => Methode d'appel des API
    setData(res.data); // --> setData est un useState React
  });
});

// <------------------------------------------------------------------------------------------->
// <----------------------------------> Utilisation du MAP <----------------------------------->
// <------------------------------------------------------------------------------------------->

// <-------------->  data est un objet avec des infos :

data.map(
  (
    country,
    index // --> pour chaque Element dans data => On chope les données des key country et index
  ) =>
    (
      <Card key={index} country={country} /> // --> On les inject dans notre composant React <Card/> en prenant les props de data par {}
    )
      .joint("") // --> IMPORTANT => Sinon ne marche pas. A checker la doc de kifékoi
);

// <-------------->  Exemple n°2 :

exo.min = parseInt(e.target.value); // --> parseInt converti le type string to number du nombre entre guillements

const handleEventArrow = function () {
  // --> Exemple de fonction dans "utils" appelé par utils.handleEventArrow
  document.querySelectorAll(".arrow").forEach((arrow) => {
    // --> Selection de tous les éléments de className "arrow" --> forEach methode {...}
    arrow.addEventListener("click", (e) => {
      // --> forEach => Ajout d'un listener de "click"
      let position = 0; // --> Initialisation de leur position à 0 puis début de la boucle "map"
      exerciceArray.map((exo) => {
        // --> Pour tous les éléments de exerciceArray appelé "exo", faire => {...}
        if (exo.pic == e.target.dataset.pic && position !== 0) {
          // --> Si l'élément exo correspond à l'élément cliqué (target.blabla) alors :
          [exerciceArray[position], exerciceArray[position - 1]] = [
            // --> Methode d'inversion des position => le cliqué en position=0 devient =-1, le =-1 passe en position 0
            // --> Inverser la position de deux éléments
            exerciceArray[position - 1],
            exerciceArray[position],
          ];
        } else {
          position++; // --> S'ils sont pas pareil, j'augmente la position et je recompare pour trouver la position cliquée
        }
        page.lobby(); // --> Display de la page après changement de position. Donc à chaque click "écouté" on redisplay
      });
    });
  });
};

// <------------------------------------------------------------------------------------------->
// <--------------------> Creation d'un class avec propriétés et méthodes <-------------------->
// <------------------------------------------------------------------------------------------->

class Exercice {
  constructor() {
    this.index = 0;
    this.minute = exerciceArray[this.index].min;
    this.seconds = 0;
  }

  updateCountDown() {
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
    console.log(this.seconds);

    setTimeout(() => {
      if (this.minute === 0 && this.seconds === "00") {
        this.index++;
        this.ring();

        if (this.index < exerciceArray.length) {
          this.minute = exerciceArray[this.index].min;
          this.seconds = 0;
          this.updateCountDown();
        } else {
          this.ring();
          this.ring();
          this.ring();
          this.ring();
          return page.finish();
        }
      } else if (this.seconds === "00") {
        this.minute--;
        this.seconds = 59;
        this.updateCountDown();
      } else {
        this.seconds--;
        this.updateCountDown();
      }
    }, 10);

    return (main.innerHTML = `<div class="exercice-container"><p> ${
      this.minute
    } : ${this.seconds} </p>
    <img src="./img/${exerciceArray[this.index].pic}.png"/>
    <div>${this.index + 1} / ${exerciceArray.length}</div>
    </div>`);
  }

  ring() {
    const audio = new Audio();
    audio.src = "ring.mp3";
    audio.play();
  }
}
