module SiteHelper
  def get_bzr_revno
    f = File.new(RAILS_ROOT + "/public/toolbars/CURRENT_TOOLBAR_REVNO", "r")
    revno = f.read.strip
  end

end
