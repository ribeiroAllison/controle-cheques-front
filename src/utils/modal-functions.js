// modal cancel opening
export const handleCancelModalOpen = () => {
  const module = document.getElementsByClassName("obsScreen")[0];
  module.style.display = "flex";
};

// modal cancel closing
export const handleCancelModalClose = () => {
  const module = document.getElementsByClassName("obsScreen")[0];
  module.style.display = "none";
};

// modal activate opening
export const handleActivateModalOpen = () => {
  const module = document.getElementsByClassName("activateScreen")[0];
  module.style.display = "flex";
};

// modal activate closing
export const handleActivateModalClose = () => {
  const module = document.getElementsByClassName("activateScreen")[0];
  module.style.display = "none";
};

// edit payment modal close
export const handleCloseEditPayment = () => {
  const editWindow = document.getElementById("paymentEditWindowBackground");
  editWindow.style.display = "none";
};

// edit payment modal open
export const handleOpenEditPayment = () => {
  const editWindow = document.getElementById("paymentEditWindowBackground");
  editWindow.style.display = "flex";
};