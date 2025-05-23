<template>
  <nav class="navigation">
    <ul>
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <a> Arztbrief </a>
        <ul class="nav-dropdown">
          <li>
            <a href="https://www.eservicet-drv.de/klinik_web/login.html">
              Arztbrief-Generator (externer Link)</a
            >
            <!-- <RouterLink to="/arztbrief-backend">Backend</RouterLink> -->
          </li>
          <!-- <li>
            <RouterLink to="/arztbrief-feedback">Feedback</RouterLink>
          </li> -->
          <li>
            <RouterLink to="/arztbrief-summarizer">Zusammenfassung</RouterLink>
          </li>
        </ul>
      </li>
      <li>
        <RouterLink to="/anamnese-generator">Anamnese-Generator</RouterLink>
      </li>
      <!-- <li>
        <a href="https://demo-ui.1dp3xfijfbm1.eu-de.codeengine.appdomain.cloud"> Anonymizer</a>
      </li> -->
      <li>
        <a> Patientenübersicht </a>
        <ul class="nav-dropdown">
          <li>
            <a
              href="https://patient-summary-route-mla.ohpdemo01-990e7b837f1894cb67c000b2ea26e354-0000.eu-de.containers.appdomain.cloud/#/cp-dashboard/0000-0001"
            >
              Patientenübersicht (externer Link)</a
            >
          </li>
          <li>
            <RouterLink to="/patienten-uebersicht">Patientenübersicht</RouterLink>
          </li>
        </ul>
      </li>
      <li>
        <RouterLink to="/pflegegutachten">Pflegegutachten</RouterLink>
      </li>
      <br />
      <li>
        <a> Dokumentenanalyse </a>
        <ul class="nav-dropdown">
          <li>
            <a
              href="https://keycloak-ui-release.pic-rhos-vpc-cluster-41f6e661cc85d0fd89d529791d8d1453-0001.eu-de.containers.appdomain.cloud/realms/cortex/protocol/openid-connect/auth?approval_prompt=force&client_id=cortex-login&redirect_uri=https%3A%2F%2Fcortex-ui-release.pic-rhos-vpc-cluster-41f6e661cc85d0fd89d529791d8d1453-0001.eu-de.containers.appdomain.cloud%2Foauth2%2Fcallback&response_type=code&scope=openid&state=nhcKIhwp4L9lPNFOPuS3NCEOwXtUHTd5Jy7E1isyopE%3A%2F"
            >
              Finden statt Suchen (externer Link)</a
            >
          </li>
          <li>
            <RouterLink to="/dokumenten-analyse">Finden statt Suchen</RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
