-- Move "Admin" link from navbar to footer (Explore group, below Contact)
-- Run with: npx wrangler d1 execute kathe-gaararu-db --remote --file=scratch/move_admin_to_footer.sql

DELETE FROM nav_links WHERE id = 'nav_admin';

INSERT OR REPLACE INTO footer_links
  (id, label_en, label_kn, href, group_name, icon, order_index)
VALUES
  ('fl_admin', 'Admin', 'ನಿರ್ವಾಹಕ', '/admin', 'explore', '', 3);
