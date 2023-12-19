/* eslint-disable react/no-unescaped-entities */
import React from 'react'

export const Footer: React.FC = () => (
  <footer>
    <h2>Nos services</h2>
    <div className='services'>
      <div className='service'>
        <h3>- A Propos</h3>
        <p>Ce système à realiser par Clément, Adem, Kayssan, Elyes et Hillyad. Au cour de notre projet réalisé pendant le cours Hardware, nous avons développé un système de lecteur de badge novateur en combinant les capacités puissantes d'Arduino et d'ESP32. Utilisant un lecteur RFID, notre dispositif permet une identification rapide et sécurisée des utilisateurs, simplifiant ainsi la gestion des accès. L.statusdeniedArduino Uno prend en charge le traitement local des données, tandis que l'ESP32 offre une connectivité sans fil, facilitant la communication avec un serveur central.</p>
      </div>
      <div className='servicee'>
        <h3 className='contacts'>- Contact</h3>
        <b>cbonnafous@guardiaschool.fr<br/> hsoumahill@guardiaschool.fr</b>
      </div>
    </div>
    <p className='contact'>Guardia Cybersecurity School : Projet Hardware | &copy; 2023, Badge Reader</p>
  </footer>
)
