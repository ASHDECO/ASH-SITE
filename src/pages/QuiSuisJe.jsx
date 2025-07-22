import React from "react";
import portrait from '../assets/portrait.jpg';

export default function QuiSuisJe() {
  return (
    <div style={{
      maxWidth: 820,
      margin: "38px auto 0 auto",
      background: "#fff",
      borderRadius: 20,
      boxShadow: "0 3px 22px #202e5a0c",
      padding: "48px 18px 42px 18px",
      textAlign: "center"
    }}>
      {/* Photo en haut, bien centrée */}
      <img
        src={portrait}
        alt="Portrait de l'artiste"
        style={{
          width: 170,
          height: 170,
          objectFit: "cover",
          borderRadius: "50%",
          margin: "0 auto 36px auto",
          display: "block",
          boxShadow: "0 2px 16px #3341c245"
        }}
      />

      <h1 style={{
        fontWeight: 700,
        color: "#2d3376",
        fontSize: 29,
        marginBottom: 31,
        letterSpacing: 0.6
      }}>
        Qui suis-je&nbsp;?
      </h1>

      <div
        style={{
          fontSize: 18,
          color: "#242437",
          textAlign: "justify",
          lineHeight: 1.75,
          letterSpacing: 0.03,
          maxWidth: 700,
          margin: "0 auto",
          wordBreak: "break-word",
        }}
      >

        {/* 1 paragraphe = 1 <p> ... </p>  */}
        <p style={{ marginBottom: 27 }}>
          <b>Présentation de, moi... Anne-Sophie Hannequin</b><br />
          Artiste peintre plasticienne – Créatrice de souvenirs, de matières et d’émotions
        </p>

        <p style={{ marginBottom: 27 }}>
          Je m’appelle Anne-Sophie Hannequin et depuis toujours, la création fait partie de ma vie.
          Je me définis comme artiste peintre plasticienne, mais au fond, je suis avant tout une amoureuse
          de l’originalité, des matières et de toutes ces petites choses qui racontent une histoire.
        </p>

        <p style={{ marginBottom: 27 }}>
          J’ai eu la chance de voyager, de découvrir des paysages qui m’ont marquée : deux années à La Réunion
          bercées par la lumière de l’Océan Indien, des séjours inspirants à Dubaï, Doha, des balades en Italie ou en Espagne…
          Chacun de ces voyages a nourri mon regard, enrichi mon univers, et m’a permis de rapporter des souvenirs authentiques,
          bien loin des cartes postales classiques.
        </p>

        <p style={{ marginBottom: 27 }}>
          J’ai toujours eu ce réflexe : ramener de chaque endroit un objet, une matière, une sensation.
          Comme ce jour inoubliable en Sardaigne, où nous avions loué un bateau : l’eau était cristalline,
          les fonds marins pleins de trésors. Et là, une magnifique branche de bois flotté reposait tout au fond,
          comme déposée juste pour nous. Problème : j’ai depuis toujours une vraie appréhension de l’eau,
          suite à un événement dans mon enfance… Alors, qui d’autre que mon fils pour plonger à ma place ?
          Je le regardais, un peu inquiète mais surtout admirative, tenter de remonter cette branche,
          pendant que je lançais : “Tu as vu comme elle est belle ? Tu crois que tu pourrais aller la chercher ?”
          (Petit clin d’œil au courage filial, et à mon goût pour les souvenirs originaux !)
        </p>

        <p style={{ marginBottom: 27 }}>
          Dans mon travail, j’aime assembler, marier, transformer les matières : métal, fer, bois flotté, feuille d’or ou d’argent,
          jean, sable, et mille autres éléments glanés ici et là. Chaque toile, chaque œuvre à poser au mur, est le fruit de ces rencontres :
          entre la nature, le hasard, et l’émotion du moment. J’aime prendre mon temps : une toile peut sommeiller dans mon atelier,
          puis soudain recevoir un nouvel éclat, une touche de couleur ou de matière, selon ce que je ressens. Parfois, une œuvre commencée
          il y a dix ans reprend vie, s’enrichit au fil des années et des expériences, jusqu’à raconter une histoire bien plus vaste que ce que
          j’avais imaginé au départ.
        </p>

        <p style={{ marginBottom: 27 }}>
          Je crois que c’est cela qui fait la force de mon art : chaque œuvre porte en elle un morceau de vie, une émotion, un souvenir,
          et grandit avec le temps. Ce ne sont pas de simples objets de décoration, mais des compagnons de route, qui traversent les années,
          accompagnent les familles, évoluent au rythme de la vie, et deviennent peu à peu témoins de moments partagés. J’aime penser que ces œuvres
          trouveront leur place dans de nouveaux foyers, où elles continueront d’accompagner d’autres histoires, d’autres émotions,
          au fil du temps et des générations.
        </p>

        <p style={{ marginBottom: 27 }}>
          J’ai eu la chance de pouvoir exposer mes créations grâce à la communauté de la ville de Gravelines,
          et chaque échange, chaque sourire reçu à ces occasions reste un souvenir précieux. Mon rêve a toujours été
          de pouvoir vivre de ma passion. Pendant longtemps, je n’osais pas donner un vrai prix à mes toiles : je préférais
          les voir partir chez quelqu’un qui les aimait, quitte à vendre à perte, simplement heureuse qu’elles soient appréciées.
          Mais aujourd’hui, en pleine reconversion professionnelle, encouragée par mon fils et mes proches, je décide enfin de tenter l’aventure :
          publier mes œuvres, partager tout ce qui dormait chez moi depuis des années, et, qui sait, toucher d’autres personnes, ailleurs.
        </p>

        <p style={{ marginBottom: 27 }}>
          Ce que je propose, ce n’est pas une toile industrielle imprimée par milliers, mais une création unique, réalisée à la main, avec cœur et sincérité.
          À l’heure où l’on voit sur internet des tableaux sans âme vendus à des prix fous, je me demande souvent : pourquoi une œuvre authentique,
          racontant une histoire, vaudrait-elle moins ?
          Je ne cherche pas à m’aligner sur ces tarifs. Je souhaite simplement pouvoir en vivre, et donner à chacun la possibilité d’acquérir
          une œuvre vraiment personnelle : une toile qui saura trouver sa place dans votre maison, traverser les années à vos côtés,
          et devenir un témoin silencieux de tous les événements de votre vie.
        </p>

        <p style={{ marginBottom: 27 }}>
          J’aime particulièrement créer sur-mesure, à l’écoute de vos envies et de votre personnalité. Échanger, ressentir ce qui vous anime,
          prendre en compte vos goûts, vos couleurs préférées, imaginer une œuvre qui vous ressemble… C’est un vrai bonheur de lier ma créativité
          à votre histoire, et de voir naître, peu à peu, un tableau profondément connecté à vous.
        </p>

        <p style={{ marginBottom: 27 }}>
          Merci d’avoir pris le temps de découvrir mon univers, et peut-être de vous laisser toucher par mes œuvres.
          Je me tiens à votre disposition pour échanger, partager une histoire, et pourquoi pas, commencer ensemble une nouvelle aventure créative.
        </p>

        <p style={{ marginTop: 38, fontWeight: 600, fontSize: 18, letterSpacing: 0.04 }}>
          Anne-Sophie Hannequin<br />
          Artiste peintre plasticienne<br />
          <span style={{ fontWeight: 400, fontSize: 16 }}>
            (Et collectionneuse passionnée de souvenirs extraordinaires…)
          </span>
        </p>
      </div>
    </div>
  );
}

