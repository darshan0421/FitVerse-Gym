
// Small interactive script to power modal, search and contact form
document.addEventListener('DOMContentLoaded', () => {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  const cards = Array.from(document.querySelectorAll('.card'));
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalType = document.getElementById('modal-type');
  const modalUsage = document.getElementById('modal-usage');
  const modalBenefits = document.getElementById('modal-benefits');
  const modalWeight = document.getElementById('modal-weight');
  const modalWho = document.getElementById('modal-who');
  const closeBtn = document.getElementById('modal-close');

  function openModal(card) {
    const title = card.querySelector('h4').textContent;
    modalTitle.textContent = title;
    modalImg.src = card.querySelector('img').src;
    modalType.textContent = card.dataset.type;
    modalUsage.textContent = card.dataset.usage;
    modalBenefits.textContent = card.dataset.benefits;
    modalWeight.textContent = card.dataset.weightlimit;
    modalWho.textContent = card.dataset.who;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Search and filter
  const search = document.getElementById('search');
  const filter = document.getElementById('filter');

  function applyFilter() {
    const q = search.value.trim().toLowerCase();
    const type = filter.value;
    cards.forEach(card => {
      const text = (card.textContent + ' ' + card.dataset.benefits + ' ' + card.dataset.usage).toLowerCase();
      const matchQuery = q === '' || text.includes(q);
      const matchType = type === 'all' || card.dataset.type === type;
      card.style.display = (matchQuery && matchType) ? '' : 'none';
    });
  }

  search.addEventListener('input', applyFilter);
  filter.addEventListener('change', applyFilter);

  // Simple contact form handler (no backend)
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks! Your message has been recorded locally. Replace with a backend POST for full functionality.');
    e.target.reset();
  });

});
