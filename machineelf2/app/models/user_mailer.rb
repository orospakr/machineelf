class UserMailer < ActionMailer::Base
  def signup_notification(user)
    setup_email(user)
    @subject    += 'Account Activation'

    @body[:url]  = "http://machineelf.orospakr.ca/activate/#{user.activation_code}"

  end

  def activation(user)
    setup_email(user)
    @subject    += 'Your account has been activated!'
    @body[:url]  = "http://machineelf.orospakr.ca/"
  end

  protected
    def setup_email(user)
      @recipients  = "#{user.email}"
      @from        = "Machine Elf 2 <andrew@orospakr.ca>"
      @subject     = "[Machine Elf 2] "
      @sent_on     = Time.now
      @body[:user] = user
    end
end
