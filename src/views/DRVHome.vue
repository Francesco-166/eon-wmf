<script setup lang="ts">
// import { useHead } from '@unhead/vue'
import { onMounted, ref } from 'vue'
import MasonryWall from '@yeger/vue-masonry-wall'
import { type htmlModule } from '@/definitions/interfaces'
import DRVBox from '@/components/DRVBox.vue'

// const title = 'Kletterwald München – Anfahrt'
// const myPage = ref({
//   description:
//     'Anfahrt zum Kletterwald München ✅ Mit öffentlichen ✅ Tram 26 oder S7 ✅ und mit dem PKW',
// })
// useHead({
//   // ref (recommended)
//   title,
//   // computed getter (recommended)
//   meta: [{ name: 'description', content: () => myPage.value.description }],
// })

const drvIncubatorApps = [
  {
    classes: 'paketbox_modul_1',
    modules: [
      {
        html: "<div class='box_feature_3'><h1>Ablauf zuhaus</h1><br /><br /><h2>Reservierung & Buchung</h2><p>Um unseren Kletterwald zu besuchen, bitten wir euch vorab online zu buchen, das hat eine Reihe von Vorteilen:<br /><br />- keine Wartezeiten beim Check-in<br />- garantierter Platz zur gebuchten Uhrzeit<br />- nahezu leere Parcours bringen mehr Kletterspaß<br />- die Kletterzeit von 4 Stunden kann durch den Wegfall von Wartezeiten beim Klettern optimal genutzt werden<br /><br /></p><h2>Bezahlung</h2><p>Am Ende des Buchungsvorgangs bezahlst du bequem per PayPal oder Bankeinzug deinen Kletterwaldbesuch im Voraus.<br /><br />Bitte beachten: mit Gutschein(en) musst du derzeit regulär online buchen (und bezahlen), bei Vorlage im Wald bekommst du den zuviel bezahlten Betrag zurückerstattet.<br /><br />Bitte bring dennoch ausreichend Bargeld für Getränke, Handschuhe oder andere Leistungen mit. Vor Ort ist aus technischen Gründen nur Barzahlung möglich!<br /><br /></p><h2>Stornobedingungen</h2><p>Reservierungen für das Klettern können bis 7 Tage (168 Std) vor Reservierungsbeginn kostenlos umgebucht oder storniert werden. Bei Stornierung oder Änderungen bis 24 Std vor Reservierungsbeginn wird eine Aufwandspauschale in Höhe von 20% (Differenz zur ursprünglichen Buchung) zur Zahlung fällig. Bei einer Stornierung, Änderung oder Nichterscheinen ab 24 Std vor Reservierungsbeginn berechnen wir den vollen Betrag.<br /><br /></p></div>",
      },
    ],
  },
  {
    classes: 'paketbox_modul_1',
    modules: [
      {
        html: "<div class='box_feature_3'><h1>Ablauf im Kletterwald</h1><br /><br /><h2>Packliste (mit Bild Handschuhe)</h2>- geeignete Handschuhe (<a href='/handschuhe'>mehr Information</a>)<br />- Reservierungsbestätigung (gern digital auf deinem Smartphone)<br />- Bargeld<br />- Schuhe und Kleidung für eine Outdooraktivität<br /><br /></p><h2>Handschuhpflicht</h2><p>Unsere Handschuhpflicht um Verletzungen vorzubeugen gilt weiterhin. Sie können geeignete Handschuhe (<a href='/handschuhe'>mehr Information</a>) selber mitbringen oder bei uns für 3€ erwerben. Leihhandschuhe können wir nicht mehr zur Verfügung stellen.</p><h2>Anreise</h2><p>Bitte denkt daran ca. 10 Minuten Fußweg vom Parkplatz bis zum Kletterwald einzuplanen. Stell bitte sicher, dass Du mit allen Teilnehmern deiner Gruppe 15 Minuten vor der Einweisung auf dem Kletterwaldgelände bist. Bei Verspätungen können wir nicht garantieren, dass es an diesem Tag noch freie Plätze für euch gibt.<br /><br /></p><h2>Wertsachen, Rucksäcke, Taschen & Co</h2><p>Wertsachen (Schlüssel, Geldbeutel, Handy) können weiterhin an der Kasse zur Aufbewahrung abgegeben werden. Rucksäcke können wir leider nicht mehr aufbewahren. Dafür gibt es eine offen zugängliche, nicht absperrbare Garderobe. Bitte bringt möglichst wenig Gepäck mit auf das Gelände.<br /><br /></p></div>",
      },
    ],
  },
]

let oberserverFiredFirstTime = false
const masonrySection = ref<Element>()
const animateMasonrySection = ref<boolean>(false)

const observer = new IntersectionObserver(
  ([entry]) => {
    // console.log(entry.target);
    if (oberserverFiredFirstTime == true) {
      //   console.log(entry.isIntersecting);
      oberserverFiredFirstTime = false
    } else if (entry.isIntersecting) {
      if (entry.target == masonrySection.value) {
        console.log('masonrySection animation')
        animateMasonrySection.value = entry.isIntersecting
      }
      observer.unobserve(entry.target)
    }
  },
  {
    threshold: 0.9,
  },
)

onMounted(() => {
  //   console.log("onMounted");
  if (masonrySection.value) {
    // console.log("masonrySection exists, starting observation");
    observer.observe(masonrySection.value as Element)
  }
})
</script>

<template>
  <!-- <div class="spacer-30"></div> -->
  <!-- Masonry Section -->
  <div class="container" ref="masonrySection">
    <transition name="fade">
      <MasonryWall
        v-if="animateMasonrySection"
        :items="drvIncubatorApps"
        :column-width="500"
        :gap="50"
      >
        <template #default="{ item }">
          <!-- {{ item }} -->
          <DRVBox classes="box_feature_3" :modules="item.modules as htmlModule[]" />
          <div class="spacer-15"></div>
        </template>
      </MasonryWall>
    </transition>
  </div>

  <div class="spacer-30"></div>

  <div class="container">
    <div class="row">
      <div class="col-md-6 mb-30">
        <div class="box_feature_3">
          <h1>Arztbrief</h1>
          <br />
          <br />
          <h2>Generator</h2>
          <p>
            <RouterLink to="/arztbrief-backend">Arztbrief-Generator </RouterLink>
          </p>
          <h2>Summarizer</h2>
          <p>
            <RouterLink to="/arztbrief-summarizer">Arztbrief-Summarizer </RouterLink>
          </p>
          <h2>Feedback</h2>
          <p>
            <RouterLink to="/arztbrief-feedback">Arztbrief-Feedback </RouterLink>
          </p>
        </div>
      </div>
      <div class="col-md-6 mb-30">
        <div class="box_feature_3">
          <h1>Anamnese-Generator</h1>
          <br />
          <br />
          <h2>Generator</h2>
          <p>
            <RouterLink to="/anamnese-generator">Anamnese-Generator </RouterLink>
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-30">
        <div class="box_feature_3">
          <h1>Pflegegutachten</h1>
          <br />
          <br />
          <h2>Pflegegutachten</h2>
          <p>
            <RouterLink to="/pflegegutachten">Pflegegutachten </RouterLink>
          </p>
        </div>
      </div>
      <div class="col-md-6 mb-30">
        <div class="box_feature_3">
          <h1>Anonymizer</h1>
          <br />
          <br />
          <h2>Anonymizer</h2>
          <p>
            <RouterLink to="/anonymizer">Anonymizer </RouterLink>
          </p>
        </div>
      </div>
    </div>
    <!-- ... -->
  </div>
</template>

<style scoped></style>
